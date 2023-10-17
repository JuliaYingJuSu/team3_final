import styles from "@/components/layout/default-layout/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerText}>
        <p>Copyright© 2023 MFEE40 TEAM3.</p>
        <p>All Rights Reserved.</p>
      </div>
      <div className={styles.cheese}></div>
    </footer>
  );
}
