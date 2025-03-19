# Add job to update apt on a regular basis

# Call the add_cron.sh script explicitly with bash
bash setup_scripts/apt_update_cron.sh

bash setup_scripts/add_python_deps.sh

bash setup_scripts/add_timer_as_systemd_service.sh

