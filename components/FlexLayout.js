import Head from 'next/head';
import styles from './BasicLayout.module.css';

export default function BasicLayout({ title, children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title || 'Student Workspace'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Votre nouvel environnement de travail" />
      </Head>

      <main className={styles.flex}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>
          <b>Student Workspace</b> — Votre nouvel environnement de travail
        </p>
      </footer>
    </div>
  );
};
