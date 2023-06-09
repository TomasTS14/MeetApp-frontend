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
        destination: "http://localhost:8080/events/near_me"
      },
      {
        source: "/api/events/liked/:id",
        destination: "http://localhost:8080/events/liked/:id"
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
        destination: "http://localhost:8080/events/interaction/:eventId*"
      },
      {
        source: "/api/events/my_events",
        destination: "http://localhost:8080/events/my_events"
      },
      {
        source: "/api/events/save",
        destination: "http://localhost:8080/events/save"
      },
      {
        source: "/api/events/delete/:eventId",
        destination: "http://localhost:8080/events/delete/:eventId"
      },
      {
        source: "/api/events/interaction/:eventId",
        destination: "http://localhost:8080/events/interaction/:eventId"
      },
      {
        source: "/api/events/:id",
        destination: "http://localhost:8080/events/:id"
      },
      {
        source: "/api/users/signup",
        destination: "http://localhost:8080/users/signup"
      },
      {
        source: "/api/users/login",
        destination: "http://localhost:8080/users/login",
      },
      {
        source: "/api/users/:slug",
        destination: "http://localhost:8080/users/:slug",
      },
      {
        source: "/api/users/check/params",
        destination: "http://localhost:8080/users/check/params"
      }
    ];
  },
}

module.exports = nextConfig
