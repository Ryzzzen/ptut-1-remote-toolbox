import { withIronSession } from 'next-iron-session';
import validate from 'validate.js';

import { query } from '../../../lib/db';
import { hash } from '../../../lib/encryption';

async function handler(req, res, session) {
  const user = req.session.get('user');
  if (!user || user.userType == 0) return res.status(401).send('NOT_AUTHORIZED');

  let post = req.body;
  let errors = validate(post, {
    title: {
      presence: true,
      length: {
        minimum: 5
      }
    },
    content: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  });

  console.dir(post);
  if (errors) return res.status(400).send({ errors, success: false });

  try {
    const results = await query(
      `
      INSERT INTO posts (title, content, userId, classId)
      VALUES (?, ?, ?, ?)
      `,
      [post.title, post.content, user.userId, post.classId]
    );

    res.send({ success: true });
  }
  catch (error) {
    res.status(500).json({ error: error.message || error, success: false });
  }
}

export default withIronSession(handler, {
  cookieName: "ptut-1/sessions/v1",
  password: process.env.SECRET_COOKIE_PASSWORD,
  // La sécurisation s'active que si Node.js n'est pas en mode développement (il est en production quand c'est Vercel qui l'héberge)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
