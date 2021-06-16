import dotenv from 'dotenv'
import { getPlaylistItems } from '$lib/ytapi';

dotenv.config()

const uploadsPlaylistId = "UUIfE0xC0WPJmxOaRl70Zheg"
const key = process.env['YT_KEY']

const getOwnPlaylistItems = getPlaylistItems(key)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {

	const data = await getOwnPlaylistItems(uploadsPlaylistId)

	if (data) {
		return {
			body: {
				data
			}
		};
	}
}