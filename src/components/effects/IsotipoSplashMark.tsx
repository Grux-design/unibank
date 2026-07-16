import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

const RIGHT_FILL =
  "M33.796 14.5454C31.1814 14.5454 29.0614 16.6622 29.0614 19.2726V33.4545C29.0614 36.2692 28.2998 38.9028 26.981 41.1742C25.3027 44.0547 22.7046 46.3459 19.5921 47.6397C17.7721 48.4 15.7741 48.8181 13.6739 48.8181C12.988 48.8181 12.3055 48.7721 11.6362 48.6832C14.0332 50.2008 16.7171 51.3069 19.5889 51.8928C21.122 52.2023 22.7046 52.3637 24.3268 52.3637C25.9489 52.3637 27.5283 52.2023 29.0581 51.8928C39.866 49.7004 47.9999 40.1635 47.9999 28.7272C47.9999 20.8924 41.6398 14.5454 33.7928 14.5454";

const RIGHT_STROKE =
  "M33.796 14.5454V13.5454C30.6306 13.5454 28.0614 16.1084 28.0614 19.2726H29.0614H30.0614C30.0614 17.2159 31.7322 15.5454 33.796 15.5454V14.5454ZM29.0614 19.2726H28.0614V33.4545H29.0614H30.0614V19.2726H29.0614ZM29.0614 33.4545H28.0614C28.0614 36.0861 27.3499 38.5473 26.1162 40.6721L26.981 41.1742L27.8458 41.6764C29.2498 39.2583 30.0614 36.4522 30.0614 33.4545H29.0614ZM26.981 41.1742L26.1169 40.6708C24.5477 43.3642 22.1175 45.507 19.2083 46.7163L19.5921 47.6397L19.976 48.5631C23.2917 47.1848 26.0578 44.7453 27.845 41.6777L26.981 41.1742ZM19.5921 47.6397L19.2066 46.717C17.5073 47.4269 15.6403 47.8181 13.6739 47.8181V48.8181V49.8181C15.908 49.8181 18.0369 49.3732 19.9776 48.5624L19.5921 47.6397ZM13.6739 48.8181V47.8181C13.0326 47.8181 12.3941 47.7751 11.7679 47.6919L11.6362 48.6832L11.5045 49.6744C12.217 49.7691 12.9435 49.8181 13.6739 49.8181V48.8181ZM11.6362 48.6832L11.1013 49.5281C13.5978 51.1087 16.3948 52.2617 19.389 52.8726L19.5889 51.8928L19.7888 50.913C17.0394 50.3521 14.4685 49.2928 12.1712 47.8383L11.6362 48.6832ZM19.5889 51.8928L19.391 52.873C20.9891 53.1957 22.638 53.3637 24.3268 53.3637V52.3637V51.3637C22.7711 51.3637 21.2548 51.209 19.7868 50.9126L19.5889 51.8928ZM24.3268 52.3637V53.3637C26.0155 53.3637 27.6613 53.1957 29.2564 52.8729L29.0581 51.8928L28.8598 50.9127C27.3952 51.209 25.8823 51.3637 24.3268 51.3637V52.3637ZM29.0581 51.8928L29.2569 52.8728C40.5205 50.588 48.9999 40.6498 48.9999 28.7272H47.9999H46.9999C46.9999 39.6772 39.2116 48.8128 28.8593 50.9128L29.0581 51.8928ZM47.9999 28.7272H48.9999C48.9999 20.3384 42.1903 13.5454 33.7928 13.5454V14.5454V15.5454C41.0893 15.5454 46.9999 21.4465 46.9999 28.7272H47.9999Z";

const LEFT_FILL =
  "M22.8858 38.1587C20.6122 35.6322 19.2328 32.2981 19.2328 28.6414V4.77356C19.2328 2.6095 17.7863 0.784514 15.7974 0.196129C15.6668 0.156238 15.5295 0.12632 15.3922 0.0964021C15.0809 0.033242 14.7595 0 14.4279 0C6.45891 0 0 6.4124 0 14.3207V33.4149C0 38.0123 2.38736 42.0646 5.9935 44.4082C8.06946 45.7578 10.5506 46.5455 13.2225 46.5455C15.3889 46.5455 17.4281 46.027 19.2328 45.1096C21.5397 43.9394 23.455 42.1178 24.7273 39.8872C24.0611 39.3653 23.445 38.7869 22.8858 38.1552";

const LEFT_STROKE =
  "M15.7974 0.196129L15.5053 1.15257L15.5137 1.15505L15.7974 0.196129ZM15.3922 0.0964021L15.605 -0.880691L15.598 -0.882209L15.591 -0.883627L15.3922 0.0964021ZM5.9935 44.4082L6.53855 43.5698L6.53842 43.5697L5.9935 44.4082ZM19.2328 45.1096L18.7804 44.2177L18.7796 44.2181L19.2328 45.1096ZM24.7273 39.8872L25.5959 40.3827L26.0238 39.6326L25.344 39.1L24.7273 39.8872ZM22.8858 38.1586L23.6291 37.4897C21.5142 35.1396 20.2328 32.0414 20.2328 28.6414H19.2328H18.2328C18.2328 32.5548 19.7103 36.1249 22.1424 38.8276L22.8858 38.1586ZM19.2328 28.6414H20.2328V4.77356H19.2328H18.2328V28.6414H19.2328ZM19.2328 4.77356H20.2328C20.2328 2.15016 18.479 -0.0534201 16.0811 -0.762791L15.7974 0.196129L15.5137 1.15505C17.0937 1.62245 18.2328 3.06884 18.2328 4.77356H19.2328ZM15.7974 0.196129L16.0894 -0.760274C15.9129 -0.814192 15.735 -0.852374 15.605 -0.880691L15.3922 0.0964021L15.1794 1.0735C15.3241 1.10501 15.4207 1.12667 15.5054 1.15253L15.7974 0.196129ZM15.3922 0.0964021L15.591 -0.883627C15.2148 -0.959961 14.8268 -1 14.4279 -1V0V1C14.6921 1 14.947 1.02645 15.1933 1.07643L15.3922 0.0964021ZM14.4279 0V-1C5.9136 -1 -1 5.85316 -1 14.3207H0H1C1 6.97163 7.00422 1 14.4279 1V0ZM0 14.3207H-1V33.4149H0H1V14.3207H0ZM0 33.4149H-1C-1 38.3673 1.57271 42.7278 5.44858 45.2467L5.9935 44.4082L6.53842 43.5697C3.20201 41.4014 1 37.6573 1 33.4149H0ZM5.9935 44.4082L5.44845 45.2466C7.6815 46.6983 10.351 47.5455 13.2225 47.5455V46.5455V45.5455C10.7501 45.5455 8.45742 44.8172 6.53855 43.5698L5.9935 44.4082ZM13.2225 46.5455V47.5455C15.5505 47.5455 17.7446 46.9879 19.686 46.001L19.2328 45.1096L18.7796 44.2181C17.1116 45.0661 15.2272 45.5455 13.2225 45.5455V46.5455ZM19.2328 45.1096L19.6852 46.0014C22.1656 44.7432 24.2261 42.7842 25.5959 40.3827L24.7273 39.8872L23.8587 39.3918C22.6839 41.4513 20.9138 43.1356 18.7804 44.2177L19.2328 45.1096ZM24.7273 39.8872L25.344 39.1C24.7246 38.6148 24.1528 38.0779 23.6345 37.4924L22.8858 38.1552L22.137 38.8181C22.7371 39.496 23.3976 40.1158 24.1106 40.6744L24.7273 39.8872Z";

interface SplashPillProps {
  fill: string;
  stroke: string;
  maskId: string;
  origin: string;
  delay?: number;
  reducedMotion: boolean;
}

function SplashPill({
  fill,
  stroke,
  maskId,
  origin,
  delay = 0,
  reducedMotion,
}: SplashPillProps) {
  if (reducedMotion) {
    return (
      <g>
        <mask id={maskId} fill="white">
          <path d={fill} />
        </mask>
        <path d={fill} fill="white" />
        <path d={stroke} fill="white" mask={`url(#${maskId})`} />
      </g>
    );
  }

  return (
    <motion.g
      style={{ transformOrigin: origin, transformBox: "fill-box" }}
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        scale: { duration: 0.55, delay: delay + 0.55, ease: EASE.premium },
        opacity: { duration: 0.25, delay, ease: EASE.premium },
      }}
    >
      <mask id={maskId} fill="white">
        <path d={fill} />
      </mask>

      {/* Contorno — trazo sin fill para no deformar la pill */}
      <motion.path
        d={fill}
        fill="none"
        stroke="white"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 0 }}
        transition={{
          pathLength: { duration: 0.9, delay, ease: EASE.cinematic },
          opacity: { duration: 0.18, delay: delay + 0.72, ease: "easeOut" },
        }}
      />

      {/* Fill — bloom al completar el trazo */}
      <motion.path
        d={fill}
        fill="white"
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: 1 }}
        transition={{
          duration: 0.42,
          delay: delay + 0.62,
          ease: EASE.premium,
        }}
      />

      {/* Stroke nativo del SVG — snap sutil */}
      <motion.path
        d={stroke}
        fill="white"
        mask={`url(#${maskId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.28,
          delay: delay + 0.82,
          ease: EASE.premium,
        }}
      />
    </motion.g>
  );
}

/** Splash isotipo — official SVG with per-pill fill + masked stroke (no extra stroke overlay). */
export function IsotipoSplashMark() {
  const uid = useId().replace(/:/g, "");
  const rightMaskId = `${uid}-right-mask`;
  const leftMaskId = `${uid}-left-mask`;
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.svg
      className="intro-splash__isotipo"
      viewBox="0 0 48 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial={reducedMotion ? false : { opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      animate={reducedMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: EASE.premium }}
    >
      <SplashPill
        fill={RIGHT_FILL}
        stroke={RIGHT_STROKE}
        maskId={rightMaskId}
        origin="30px 33px"
        delay={0}
        reducedMotion={reducedMotion}
      />
      <SplashPill
        fill={LEFT_FILL}
        stroke={LEFT_STROKE}
        maskId={leftMaskId}
        origin="12px 23px"
        delay={0.18}
        reducedMotion={reducedMotion}
      />
    </motion.svg>
  );
}
