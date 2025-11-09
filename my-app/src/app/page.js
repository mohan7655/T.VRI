import Image from "next/image";
import styles from "./page.module.css";
import { Button, Divider, Typography } from "@mui/material";
import { Hoz, StyledButton, Text } from "./components/components";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography variant="h2" gutterBottom>
          What is Vipassana
        </Typography>
        <Divider />
        <Text variant="body1" gutterBottom sx={{ whiteSpace: "pre-wrap" }}>
          Vipassana, which means to see things as they really are, is one of
          India's most ancient techniques of meditation. It was rediscovered by
          Gotama Buddha more than 2500 years ago and was taught by him as a
          universal remedy for universal ills, i.e., an Art Of Living. This
          non-sectarian technique aims for the total eradication of mental
          impurities and the resultant highest happiness of full liberation.
          Vipassana is a way of self-transformation through self-observation. It
          focuses on the deep interconnection between mind and body, which can
          be experienced directly by disciplined attention to the physical
          sensations that form the life of the body, and that continuously
          interconnect and condition the life of the mind. It is this
          observation-based, self-exploratory journey to the common root of mind
          and body that dissolves mental impurity, resulting in a balanced mind
          full of love and compassion. The scientific laws that operate one's
          thoughts, feelings, judgements and sensations become clear. Through
          direct experience, the nature of how one grows or regresses, how one
          produces suffering or frees oneself from suffering is understood. Life
          becomes characterized by increased awareness, non-delusion,
          self-control and peace. <br /> <br /> The Tradition Since the time of
          Buddha, Vipassana has been handed down, to the present day, by an
          unbroken chain of teachers. The current teachers in this tradition
          were appointed by the late Mr. S.N. Goenka, who was Indian by descent
          but was born and raised in Burma (Myanmar). While living there, he had
          the good fortune to learn Vipassana from his teacher, Sayagyi U Ba
          Khin, who was at the time a high Government official. After receiving
          training from his teacher for fourteen years, Mr. Goenka settled in
          India and was authorised by Sayagyi to begin teaching Vipassana in
          1969. During his life he taught tens of thousands of people of all
          races and all religions in both the East and West. In 1982 he began to
          appoint assistant teachers to help him meet the growing demand for
          Vipassana courses. Before he passed away in 2013, he left behind a
          comprehensive system for training and appointment of future teachers
          in the tradition. The Courses The technique is taught at ten-day
          residential courses during which participants follow a prescribed Code
          of Discipline, learn the basics of the method, and practice
          sufficiently to experience its beneficial results. The course requires
          hard, serious work. There are three steps to the training. The first
          step is, for the period of the course, to abstain from killing,
          stealing, sexual activity, speaking falsely, and intoxicants. This
          simple code of moral conduct serves to calm the mind, which otherwise
          would be too agitated to perform the task of self-observation. The
          next step is to develop some mastery over the mind by learning to fix
          one's attention on the natural reality of the ever changing flow of
          breath as it enters and leaves the nostrils. By the fourth day the
          mind is calmer and more focused, better able to undertake the practice
          of Vipassana itself: observing sensations throughout the body,
          understanding their nature, and developing equanimity by learning not
          to react to them. Finally, on the last full day participants learn the
          meditation of loving kindness or goodwill towards all, in which the
          purity developed during the course is shared with all beings. The
          entire practice is actually a mental training. Just as we use physical
          exercises to improve our bodily health, Vipassana can be used to
          develop a healthy mind. Because it has been found to be genuinely
          helpful, great emphasis is put on preserving the technique in its
          original, authentic form. It is not taught commercially, but instead
          is offered freely. No person involved in its teaching receives any
          material remuneration. There are no charges for the courses - not even
          to cover the cost of food and accommodation. All expenses are met by
          donations from people who, having completed a course and experienced
          the benefits of Vipassana, wish to give others the opportunity to
          benefit from it also. Of course, the results come gradually through
          continued practice. It is unrealistic to expect all problems to be
          solved in ten days. Within that time, however, the essentials of
          Vipassana can be learned so that it can be applied in daily life. The
          more the technique is practiced, the greater the freedom from misery,
          and the closer the approach to the ultimate goal of full liberation.
          Even ten days can provide results which are vivid and obviously
          beneficial in everyday life. All sincere people are welcome to join a
          Vipassana course to see for themselves how the technique works and to
          measure the benefits. All those who try it will find Vipassana to be
          an invaluable tool with which to achieve and share real happiness
        </Text>
      </main>
    </div>
  );
}
