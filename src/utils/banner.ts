/**
 * http://patorjk.com/software/taag/
 * @param {string} env Application enviroment
 * @param {string} host Application host
 * @param {Number} port Application port
 */
export default (env: string, host: string, port: number) => {
  return `
  ██╗  ██╗██████╗     ███████╗ ██████╗██████╗  █████╗ ██████╗
  ██║  ██║██╔══██╗    ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
  ███████║██████╔╝    ███████╗██║     ██████╔╝███████║██████╔╝
  ██╔══██║██╔══██╗    ╚════██║██║     ██╔══██╗██╔══██║██╔═══╝
  ██║  ██║██║  ██║    ███████║╚██████╗██║  ██║██║  ██║██║

  server-start
  Env: ${env}
  Host: ${host}
  Port: ${port}
  `
}
