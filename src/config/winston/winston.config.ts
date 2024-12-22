import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const isDevelopment = process.env.AMBIENTE === 'dev';

export const winstonLogger = winston.createLogger({
  level: isDevelopment ? 'verbose' : 'info', // Nivel de logs por defecto
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    // Rotación diaria de archivos
    new DailyRotateFile({
      filename: 'logs/%DATE%.log', // Carpeta logs con archivo diario
      datePattern: 'YYYY-MM-DD', // Patron para el nombre del archivo
      maxFiles: '30d', // Mantener archivos por 30 días
      level: 'info',
    }),
    // Salida a consola
    new winston.transports.Console({
      level: isDevelopment ? 'verbose' : 'info', // Nivel de log para consola
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
