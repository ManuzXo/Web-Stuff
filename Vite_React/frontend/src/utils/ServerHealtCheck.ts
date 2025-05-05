class ServerHealtCheck {
  static async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch('/api/ping', {
        method: 'GET'
      });
      return response.ok;
    } catch (error) {
      console.error('Error during server health check:', error);
      return false;
    }
  }
}
export default ServerHealtCheck;