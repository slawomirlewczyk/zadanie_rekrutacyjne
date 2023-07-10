FROM php:8.1-apache

# Apache conf
# allow .htaccess with RewriteEngine
RUN a2enmod rewrite headers\
&& docker-php-ext-install pdo pdo_mysql

RUN yes | pecl install xdebug \
    && pecl install apcu \
    && pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis \
    && docker-php-ext-enable apcu \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.idekey=docker" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.log=/dev/stdout" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.log_level=0" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.discover_client_host=true" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.file_link_format=vscode://file/%f:%l" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "file_uploads=On" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit=1G" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "upload_max_filesize=128M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=128M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time=600" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_input_vars=100000" >> /usr/local/etc/php/conf.d/custom.ini

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN sed -ri -e '/<Directory \/var\/www\/html\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN sed -i 's/#LoadModule mod_headers/LoadModule mod_headers/g' /etc/apache2/apache2.conf