import { Task } from '../model/task.model.js';
import user from '../model/user.model.js';
import schedule from 'node-schedule';
import { Op } from 'sequelize';

export const getAllTask = async (req, res) => {
	try {
		if (!req.id) {
			return res.status(401).json({ message: 'user id not included!' });
		}

		await Task.findAll({
			where: {
				user_id: req.id
			},
			attributes: [
				'id',
				'judul',
				'deskripsi',
				'deadline',
				'is_done',
				'createdAt',
			],
		}).then((result) => {
			if (result.length > 0) {
				return res.status(200).json({
					data: result,
				});
			} else {
				return res.status(404).json({
					message: 'Data not found',
					// statusCode: 404,
				});
			}
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			// statusCode: 500
		});
	}
};

export const createTask = async (req, res) => {
	const { user_id, judul, deskripsi, deadline } = req.body;
	try {
		await Task.create({
			user_id: req.id,
			judul: req.body.judul,
			deskripsi: req.body.deskripsi,
			deadline: req.body.deadline, //yyyy-mm-dd
		});
		return res.status(201).json({ message: 'task created' });
	} catch (err) {
		res.status(400).json({
			message: err.message,
			// statusCode: 400
		});
	}
};

export const updateTask = async (req, res) => {
	if (!req.id) {
		return res.status(400).json({
			message: 'user_id has to be included',
		});
	}
	try {
		await Task.update(
			{
				user_id: req.id,
				judul: req.body.judul,
				deskripsi: req.body.deskripsi,
				deadline: req.body.deadline, //yyyy-mm-dd
				is_done: req.body.is_done,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json({ message: 'Task updated successfully' });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

export const deleteTask = async (req, res) => {
	console.log(req.params.id)
	try {
		await Task.destroy({
			trucante: true,
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).json({ message: 'Task deleted successfully' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const getTaskNotification = async (req, res) => {
	try {
		const dataTask = await Task.findAll({
			where: {
				user_id: req.id,
				is_done: false,
			},
			attributes: ['id', 'judul', 'deskripsi', 'deadline'],
		});

		const messages = [];

		dataTask.map((data) => {
			const date = new Date(data.deadline);
			const HoursDifference = date.getTime() - Date.now();

			if (HoursDifference > 0) {
				messages.push({
					judul: data.judul,
					message: `Task due ${HoursDifference} hours to go. Do it immidiately.`,
				});
			}
		});
		return res.json({ messages });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const filterTask = async (req, res) => {
	const judul = req.query.judul;
	const status = req.query.status;

	let taskFilter;
	try {
		if (!judul && !status) {
			taskFilter = await Task.findAll({
				where: {
					user_id: req.id,
				},
				attributes: [
					'id',
					'judul',
					'deskripsi',
					'deadline',
					'is_done',
					'createdAt',
				],
			});
		} else {
			taskFilter = await Task.findAll({
				where: {
					[Op.or]: [
						{
							judul: {
								[Op.substring]: judul,
							},
						},
					],
				},
				attributes: [
					'id',
					'judul',
					'deskripsi',
					'deadline',
					'is_done',
					'createdAt',
				],
			});
		}
		if (taskFilter.length > 0) {
			return res.status(200).json({ data: taskFilter });
		}
		return res.status(404).json({ message: 'No data found' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// export const getTaskById
