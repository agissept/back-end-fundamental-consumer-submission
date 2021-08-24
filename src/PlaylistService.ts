import { Pool, QueryConfig } from 'pg'

class PlaylistService {
    private pool = new Pool()

    async getSongInPlaylist (playlistId: string) {
      const query: QueryConfig = {
        text: `SELECT s.id, s.title, s.performer 
               FROM songs as s
               LEFT JOIN playlistsongs as p ON p.song_id = s.id
               WHERE p.playlist_id = $1`,
        values: [playlistId]
      }
      const { rows } = await this.pool.query(query)
      return rows
    }
}
export default PlaylistService
