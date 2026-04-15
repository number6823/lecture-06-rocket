import { useEffect, useState } from "react";
import type { RocketType } from "./Detail.tsx";
import styles from "./Home.module.css";

function Home () {
  const [loading, setLoading] = useState<boolean>(true);
  const [rocket, setRocket] = useState<RocketType[]>([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((json: RocketType[]) => {
        setRocket(json);
        setLoading(false);
      })
      .catch(err=> {
        console.log(err);
      });
  }, []);
  if (loading) {
    return <div className={styles.loading}>데이터를 로드 중 입니다...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 Space Rockets</h1>
      {rocket.map((value) => (
        <div key={value.id} className={styles.card}>
          <h2>{value.name}</h2>
          <img
            src={value.flickr_images}
            alt={value.name}
            className={styles.img}
          />
          <p>{value.description}</p>
          <p>상태: {value.active ? "✅ 활성화" : "❌비활성화"}</p>
        </div>
      ))}
    </div>
  );
}
export default Home;