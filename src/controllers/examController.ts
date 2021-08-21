import { Request, Response } from "express";
import dayjs from "dayjs";

import { PostNewExamBody } from "../protocols/interface";
import * as examService from "../services/examService";
import { newExamSchema } from "../schemas/examSchema";

export async function postNewExam(req: Request, res: Response) {
  try {
    const { link, subjectId, teacherId, categoryId, semester } =
      req.body as PostNewExamBody;
    let { year } = req.body as PostNewExamBody;

    if (!link || !subjectId || !teacherId || !categoryId || !semester || !year) {
      return res.sendStatus(400);
    }

    const err = newExamSchema.validate({
      link,
      subjectId,
      teacherId,
      categoryId,
      semester,
      year,
    }).error;
    if (err) {
      return res.sendStatus(400);
    }

    const semesterId = await examService.checkYears(semester, dayjs(year).format("YYYY"));

    const params = { link, subjectId, teacherId, categoryId, semesterId };

    await examService.saveNewTest(params);

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getExamsFromCourseTeachers(req: Request, res: Response) {
  try {
    const courseId = Number(req.params.id);
    const teachers = await examService.getTeachersExams(courseId);

    return res.send(teachers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getExamsFromCourseSubjects(req: Request, res: Response) {
  try {
    const courseId = Number(req.params.id);
    const subjects = await examService.getSubjectsExamsOrderByTerm(courseId);

    return res.send(subjects);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
