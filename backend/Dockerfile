FROM php:8.2-apache

# Install SQLite support
RUN docker-php-ext-install pdo_sqlite

# Enable Apache rewrite for routing
RUN a2enmod rewrite

# Copy public files to Apache root
COPY public/ /var/www/html/

# Copy PHP source files
COPY src/ /var/www/src/

# Copy SQLite database
COPY database/ /var/www/database/

# Ensure SQLite folder is writable
RUN chmod -R 775 /var/www/database

EXPOSE 80
CMD ["apache2-foreground"]
