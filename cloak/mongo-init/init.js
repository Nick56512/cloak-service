db = db.getSiblingDB("cloak");

db.createCollection("requestblacklists");

db.users.insertMany([
    { ip: '192.167.34.2', userAgent: "Bot 12.244.24" },
    { ip: '23.67.74.21', userAgent: "Google Bot" },
    { ip: '55.55.55.1', userAgent: "Crawler Bot 23.13 | xyz" },
]);

print("MongoDB initialized!");