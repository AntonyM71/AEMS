FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /tmp/nginx /var/cache/nginx /usr/share/nginx/html/pack \
	&& chown -R nginx:nginx /tmp/nginx /var/cache/nginx /usr/share/nginx/html

USER nginx
