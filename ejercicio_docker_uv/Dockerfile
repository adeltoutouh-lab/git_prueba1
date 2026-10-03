FROM ghcr.io/astral-sh/uv:latest AS uv
FROM python:3.12-slim

COPY --from=uv /uv /uvx /bin/
WORKDIR /home/work

RUN printf '#!/bin/sh\nmkdir -p /home/work/evidencias\nexec "$@"\n' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

ENTRYPOINT ["/usr/local/bin/start.sh"]
CMD ["bash"]
