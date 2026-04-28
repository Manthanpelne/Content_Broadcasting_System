// src/config/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg(new pg.Pool({ connectionString }));

const prisma = new PrismaClient({ adapter });

module.exports = prisma;