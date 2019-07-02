import mongoose from 'mongoose';

export default async () => {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_NAME || 'kimaia_social_app_example';
    const dbUser = process.env.DB_USER || 'samih';
    const dbPass = process.env.DB_PASS || 'samihkimaia1234!';

    try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, {
            useNewUrlParser: true,
        });
        console.log(`console.log('Connected Successfully to DB')`);
    } catch (err) {
        console.error(`ERROR CONNECTING TO DB: ${err}`);
    }
};
