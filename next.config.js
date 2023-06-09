/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.multiavatar.com', 'encrypted-tbn0.gstatic.com/', 'placehold.co', 'holder.js'],

  },
  async rewrites() {
    return [
      {
        source: "/api/events/near_me",
        destination: "https://meetapp-backend-production.up.railway.app/events/near_me"
      },
      {
        source: "/api/events/liked/:id",
        destination: "https://meetapp-backend-production.up.railway.app/events/liked/:id"
      },
      {
        source: "/api/events/interaction/:eventId*",
        has: [
          {
            type: "query",
            key: "liked",
            value: 'true' || 'false'
          }
        ],
        destination: "https://meetapp-backend-production.up.railway.app/events/interaction/:eventId*"
      },
      {
        source: "/api/events/my_events",
        destination: "https://meetapp-backend-production.up.railway.app/events/my_events"
      },
      {
        source: "/api/events/save",
        destination: "https://meetapp-backend-production.up.railway.app/events/save"
      },
      {
        source: "/api/events/delete/:eventId",
        destination: "https://meetapp-backend-production.up.railway.app/events/delete/:eventId"
      },
      {
        source: "/api/events/interaction/:eventId",
        destination: "https://meetapp-backend-production.up.railway.app/events/interaction/:eventId"
      },
      {
        source: "/api/events/:id",
        destination: "https://meetapp-backend-production.up.railway.app/events/:id"
      },
      {
        source: "/api/users/signup",
        destination: "https://meetapp-backend-production.up.railway.app/users/signup"
      },
      {
        source: "/api/users/login",
        destination: "https://meetapp-backend-production.up.railway.app/users/login",
      },
      {
        source: "/api/users/:slug",
        destination: "https://meetapp-backend-production.up.railway.app/users/:slug",
      },
      {
        source: "/api/users/check/params",
        destination: "https://meetapp-backend-production.up.railway.app/users/check/params"
      }
    ];
  },
}

module.exports = nextConfig
