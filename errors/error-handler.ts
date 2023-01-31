import { NextApiResponse } from 'next';
import HttpError from './HttpError';

const errorHandler = (err: any, res: NextApiResponse) => {

	if (err instanceof HttpError) {

		res.status(err.statusCode || 500).json({
			error: err.message || "Something went wrong!",
		});

	} else {

		res.status(500).json({ error: "Something went wrong!" });

	}

};

export default errorHandler;