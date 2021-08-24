import PlaylistService from './PlaylistService'
import MailSender from './MailSender'

class Listener {
    private playlistService: PlaylistService;
    private mailSender: MailSender;

    constructor (playlistService: PlaylistService, mailSender: MailSender) {
      this.playlistService = playlistService
      this.mailSender = mailSender

      this.listen = this.listen.bind(this)
    }

    async listen (message: any) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString())
        const playlistSong = await this.playlistService.getSongInPlaylist(playlistId)
        const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(playlistSong))
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }
}
export default Listener
