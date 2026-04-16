import { useEffect, useState } from "react";
import type { RocketType } from "./Home.tsx";
import { useParams } from "react-router";
import styles from "./Detail.module.css";
import { Link } from "react-router/internal/react-server-client";


function Detail () {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rocket, setRocket] = useState<RocketType | null>(null);

  useEffect(() => {
    if (!id) return;
    
    fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      .then(res => res.json())
      .then((json: RocketType) => {
        setRocket(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>접속 중...</div>
  }

  if (!rocket) {
    return <div className={styles.loading}>로켓 정보를 찾을 수 없습니다.</div>
  }

  return ( <div className={styles.container}>
    <Link to={"/"} className={styles.backLink}>&larr; 목록으로 돌아가기</Link>
    <article className={styles.article}>
      {rocket.flickr_images [0] && (
      <div className={styles.imageWrapper}>
          <img src={rocket.flickr_images[0]} alt={rocket.name}
          className={styles.rocketImage}
          />
      </div>
        )}
      <div className={styles.info}>
        <h1 className={styles.name}>{rocket.name}</h1>

      </div>
    </article>
  </div>
  )}

export default Detail