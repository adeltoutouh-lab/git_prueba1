#!/bin/bash
set -e
mkdir -p evidencias

printf 'import pandas\nexit()\n' | python > evidencias/parte1_evidencia1.txt 2>&1 || true

uv sync
source .venv/bin/activate

python - <<'PY' > evidencias/parte1_evidencia2.txt
import pandas
import numpy
print('pandas', pandas.__version__)
print('numpy', numpy.__version__)
PY

uv pip list > evidencias/parte1_evidencia3.txt

uv add requests > evidencias/parte1_evidencia4.txt 2>&1

uv pip list > evidencias/parte1_evidencia5.txt

cat pyproject.toml > evidencias/parte1_evidencia6.txt

uv remove requests > /tmp/uv_remove_requests.txt 2>&1
uv pip list > evidencias/parte1_evidencia7.txt

(
  cd python_codes/program1
  uv sync
  echo '$ uv run python -c "import numpy; print(numpy.__version__)"'
  uv run python -c "import numpy; print(numpy.__version__)"
  echo
  echo '$ uv run main.py'
  uv run main.py
) > evidencias/parte2_program1.txt 2>&1

(
  cd python_codes/program2
  uv sync
  echo '$ uv run python -c "import numpy; print(numpy.__version__)"'
  uv run python -c "import numpy; print(numpy.__version__)"
  echo
  echo '$ uv run main.py'
  uv run main.py
) > evidencias/parte2_program2.txt 2>&1

(
  echo 'Prueba de program1 usando el entorno de program2:'
  echo '$ python_codes/program2/.venv/bin/python python_codes/program1/main.py'
  python_codes/program2/.venv/bin/python python_codes/program1/main.py
) > evidencias/parte2_entorno_incompatible.txt 2>&1 || true
