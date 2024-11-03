import { DocumentBuilder } from '@nestjs/swagger';

export const swagger = new DocumentBuilder()
    .setTitle('seSAC')
    .setDescription('The seSAC API description made in RYU')
    .setVersion('1.0')
    .addTag('board', 'board API')
    .addServer(`http://${process.env.HOST}:${process.env.PORT}`)
    .build();
