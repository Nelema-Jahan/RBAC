copy backend\.env.example backend\.env
echo Backend .env created

copy frontend\.env.example frontend\.env 2>nul || echo Frontend .env created (if needed)
echo Setup complete!
