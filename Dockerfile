FROM python:3.13-slim-bullseye

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy the application into the container.
COPY . /app


# Install the application dependencies.
WORKDIR /app
RUN uv sync --frozen --no-cache

# Expose port 8000 for the application
EXPOSE 8000

# Run the application
CMD ["uv", "run", "fastapi", "run", "--port", "8000"]