# Ejercicio Docker y UV

Entrega del ejercicio de entornos con Docker y UV.

## Ejecución

```bash
docker compose run --rm app
```

Dentro del contenedor se puede hacer el ejercicio paso a paso. Para generar todas las evidencias de una vez:

```bash
bash generar_evidencias.sh
```

Las evidencias se guardan en la carpeta `evidencias/`.

En la parte 2, cada programa tiene su propio `pyproject.toml` y su propio entorno `.venv` porque usan versiones distintas de NumPy.
