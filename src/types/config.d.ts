
interface Config {

  /**
   * Enviroment de la aplicacion
   */
  env: string;

  http: HttpConfig;
  useragent: string;
}

interface BullConfig {
  prefix: string;
  redis: RedisConfig;
}

interface RedisConfig {
  host: string;
  port: number;
}

/**
 * Configuracion del servidor http
 */
interface HttpConfig {
  host: string;
  port: number;
}
