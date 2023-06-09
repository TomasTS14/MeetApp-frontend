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
        destination: "meetapp-backend-production.up.railway.app/events/near_me"
      },
      {
        source: "/api/events/liked/:id",
        destination: "meetapp-backend-production.up.railway.app/events/liked/:id"
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
        destination: "meetapp-backend-production.up.railway.app/events/interaction/:eventId*"
      },
      {
        source: "/api/events/my_events",
        destination: "meetapp-backend-production.up.railway.app/events/my_events"
      },
      {
        source: "/api/events/save",
        destination: "meetapp-backend-production.up.railway.app/events/save"
      },
      {
        source: "/api/events/delete/:eventId",
        destination: "meetapp-backend-production.up.railway.app/events/delete/:eventId"
      },
      {
        source: "/api/events/interaction/:eventId",
        destination: "meetapp-backend-production.up.railway.app/events/interaction/:eventId"
      },
      {
        source: "/api/events/:id",
        destination: "meetapp-backend-production.up.railway.app/events/:id"
      },
      {
        source: "/api/users/signup",
        destination: "meetapp-backend-production.up.railway.app/users/signup"
      },
      {
        source: "/api/users/login",
        destination: "meetapp-backend-production.up.railway.app/users/login",
      },
      {
        source: "/api/users/:slug",
        destination: "meetapp-backend-production.up.railway.app/users/:slug",
      },
      {
        source: "/api/users/check/params",
        destination: "meetapp-backend-production.up.railway.app/users/check/params"
      }
    ];
  },
}

module.exports = nextConfig
