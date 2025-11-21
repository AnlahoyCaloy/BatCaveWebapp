FROM php:8.2-apache

# Install system dependencies needed for SQLite and PostgreSQL
RUN apt-get update && \
    apt-get install -y \
      libsqlite3-dev \
      libpq-dev \
      pkg-config \
      git \
      unzip \
      && docker-php-ext-install pdo_sqlite pdo_pgsql \
      && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite for routing
RUN a2enmod rewrite

# Copy public files
COPY public/ /var/www/html/

# Copy PHP source files
COPY src/ /var/www/src/

# Copy SQLite database (optional if you still want SQLite locally)
COPY database/ /var/www/database/

# Make SQLite folder writable
RUN chmod -R 775 /var/www/database

EXPOSE 80
CMD ["apache2-foreground"]
