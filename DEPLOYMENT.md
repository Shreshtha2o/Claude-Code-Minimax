# Deployment Guide

## Prerequisites
- Node.js v14+
- Server with 512MB+ RAM
- Anthropic API key
- Domain name (for production)

## Deployment Options

### Option 1: Heroku Deployment

#### Step 1: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
sudo apt-get install heroku
```

#### Step 2: Create Heroku App
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add buildpacks
heroku buildpacks:add heroku/nodejs
```

#### Step 3: Set Environment Variables
```bash
heroku config:set CLAUDE_API_KEY=your-api-key
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy
```bash
git push heroku main
```

#### Step 5: Add Frontend
```bash
heroku buildpacks:add heroku-community/static
# Create Procfile and app.json if needed
```

### Option 2: AWS EC2 Deployment

#### Step 1: Launch EC2 Instance
1. Choose Ubuntu 20.04 LTS
2. Select t2.micro or larger
3. Configure security groups (allow ports 80, 443, 3000)
4. Add storage (20GB minimum)

#### Step 2: SSH into Server
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### Step 3: Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install nginx (reverse proxy)
sudo apt install -y nginx

# Install Python
sudo apt install -y python3
```

#### Step 4: Clone Project
```bash
cd /opt
sudo git clone your-repo-url
cd social-media-design-ai
sudo npm install
```

#### Step 5: Configure Environment
```bash
sudo nano .env
# Add CLAUDE_API_KEY and other variables
```

#### Step 6: Start Application with PM2
```bash
# Start backend
pm2 start backend/server.js --name "social-media-design-api"

# Save PM2 config
pm2 save

# Create startup script
pm2 startup
```

#### Step 7: Configure Nginx
```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /opt/social-media-design-ai/frontend;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 8: Setup SSL (Optional but Recommended)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 3: Docker Deployment

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - NODE_ENV=production
    volumes:
      - ./frontend:/app/frontend:ro
```

#### Step 3: Build and Run
```bash
docker build -t social-media-design-ai .
docker run -p 3000:3000 -e CLAUDE_API_KEY=your-key social-media-design-ai
```

### Option 4: DigitalOcean App Platform

#### Step 1: Create app.yaml
```yaml
name: social-media-design-ai
services:
- name: backend
  github:
    repo: your-username/social-media-design-ai
    branch: main
  build_command: npm install
  run_command: npm start
  envs:
  - key: CLAUDE_API_KEY
    scope: RUN_AND_BUILD_TIME
    value: ${CLAUDE_API_KEY}
  http_port: 3000
  
- name: frontend
  github:
    repo: your-username/social-media-design-ai
    branch: main
  source_dir: frontend
  build_command: npm install
  run_command: npm run start
  http_port: 8000
```

#### Step 2: Deploy
```bash
doctl apps create --spec app.yaml
```

## Production Checklist

- [ ] Environment variables configured
- [ ] API key secured
- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured for your domain
- [ ] Rate limiting implemented
- [ ] Error logging enabled
- [ ] Database backups (if using)
- [ ] Monitoring set up
- [ ] Email alerts configured
- [ ] Firewall rules set
- [ ] DNS records updated
- [ ] Frontend served with caching headers
- [ ] Backend load balancing (if needed)
- [ ] CDN configured for frontend (optional)

## Environment Setup for Production

```env
CLAUDE_API_KEY=your-production-api-key
PORT=3000
NODE_ENV=production
```

## Performance Optimization

### Backend Optimization
```javascript
// Add caching middleware
app.use(express.static('public', {
  maxAge: '1d',
  etag: false
}));

// Enable compression
const compression = require('compression');
app.use(compression());
```

### Frontend Optimization
- Minify CSS and JavaScript
- Enable gzip compression
- Cache static assets
- Optimize images
- Use CDN for assets

### Database Optimization (if added)
- Add indexes
- Use connection pooling
- Implement caching layer
- Monitor queries

## Monitoring & Logging

### Application Monitoring
```bash
# Install PM2 monitoring
pm2 install pm2-auto-pull
pm2 install pm2-logrotate
```

### Error Tracking (Sentry)
```bash
npm install @sentry/node
```

Add to server.js:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn"
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Run multiple instances with PM2
- Share state with Redis (if needed)

### Vertical Scaling
- Increase server RAM
- Use better CPU
- Optimize Node.js settings

## Database (Future)

When adding database:
- Use managed database service
- Enable backups
- Set up replication
- Configure monitoring
- Implement connection pooling

## Security Best Practices

1. **API Key Management**
   - Use environment variables
   - Rotate keys regularly
   - Use separate keys per environment

2. **HTTPS**
   - Always use HTTPS in production
   - Use strong SSL certificates
   - Enable HSTS

3. **Input Validation**
   - Validate all inputs
   - Sanitize user data
   - Use rate limiting

4. **CORS**
   - Configure for specific domains
   - Don't use wildcard in production

5. **Dependencies**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Fix vulnerabilities

## Disaster Recovery

1. **Backups**
   - Regular code backups
   - Configuration backups
   - Database backups (if applicable)

2. **Failover**
   - Use load balancer
   - Multiple server instances
   - Automatic restart on failure

3. **Monitoring**
   - Uptime monitoring
   - Error tracking
   - Performance alerts

## Rollback Procedure

```bash
# If deployment fails
git revert HEAD
npm install
npm start

# Or with PM2
pm2 restart all
pm2 logs
```

## Support

For deployment issues:
1. Check logs: `pm2 logs`
2. Verify API key
3. Check firewall rules
4. Review network configuration
5. Contact provider support

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review security alerts
- Monitor performance
- Check error logs
- Validate backups

### Monthly
- Update Node.js if needed
- Update npm packages
- Review costs
- Analyze usage

### Quarterly
- Full security audit
- Performance review
- Cost optimization
- Infrastructure upgrade planning
