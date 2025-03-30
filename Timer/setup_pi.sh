# Please run this script from the /AEMS/Timer diectory to ensure the service is registered with the correct file-path.
bash setup_scripts/apt_update_cron.sh

bash setup_scripts/add_python_deps.sh

bash setup_scripts/add_timer_as_systemd_service.sh

