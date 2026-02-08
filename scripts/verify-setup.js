const { sequelize } = require('../database/index'); // Adjusted for running from scripts/ or root
const User = require('../apps/auth/models/user.model');

const verifySetup = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection successful.');

        await sequelize.sync({ force: true }); // Caution: This drops tables
        console.log('✅ User model synced successfully.');

        // Create a dummy user to test
        const user = await User.create({
            user_name: 'Test User',
            user_email: 'test@example.com',
            user_contact_number: '1234567890',
            user_password: 'hashedpassword',
            platform_type: 1,
            unique_id: require('crypto').randomUUID()
        });
        console.log('✅ Dummy user created:', user.toJSON());

        console.log('🎉 Setup verification complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Verification failed:', error);
        process.exit(1);
    }
};

verifySetup();
