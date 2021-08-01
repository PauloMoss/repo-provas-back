import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Subject from './Subjects';
import Category from "./Category";
import Teacher from "./Teacher";
import Period from "./Period";


@Entity("tests")
export default class Tests {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column({ select: false })
    subjectId: number;

    @Column({ select: false })
    teacherId: number;

    @Column({ select: false })
    periodId: number;

    @Column({ select: false })
    categoryId: number;

    @ManyToOne(() => Subject, subject => subject.tests, {cascade: true})
    subject: Subject;

    @ManyToOne(() => Teacher, teacher => teacher.tests, { cascade: true})
    teacher: Teacher;

    @ManyToOne(() => Period, period => period.tests, { cascade: true})
    period: Period;

    @ManyToOne(() => Category, category => category.tests, { cascade: true})
    category: Category;
}