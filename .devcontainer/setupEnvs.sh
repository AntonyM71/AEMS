conda config --add channels conda-forge
conda config --remove channels defaults
(cd Webapp && npm install)
(cd Server && conda env create)
