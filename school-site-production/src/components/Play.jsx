import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../models/config.model'
import { Button, useSwitch } from '@nextui-org/react'
import { tasks } from '../models/tasks.model'


const Play = () => {
  const redirect = useNavigate()

  if (localStorage.getItem("resultsPage")) {
    redirect('/results')
  }

  const [questionId, setQuestionId] = useState(0)

  const [trueAnswer, setTrueAnswer] = useState(false)

  const [maxSeconds, setMaxSeconds] = useState(20);

  const [seconds, setSeconds] = useState(0)

  const [trueQuestions, setTrueQuestions] = useState([]);
  const [falseQuestions, setFalseQuestions] = useState([]);

  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const [buttonValue, setButtonValue] = useState(null)
  const [user, setUser] = useState([])

  const answer = (isAnswer) => {
    setButtonValue(isAnswer)
    console.log(isAnswer, tasks[questionId].answers.matched);
    setTimeout(() => {
      if (isAnswer == "matched") {
        trueQuestions.push(questionId)
        console.log(trueQuestions.length);
      } else {
        falseQuestions.push({ id: questionId, answer: isAnswer })
        console.log(falseQuestions.length);
      }
      setSeconds(0)
      setQuestionId(prevQuestionId => {
        if (prevQuestionId === tasks.length - 1) {
          axios.get(api + "/students/get/" + localStorage.getItem("mi")).then(res => {
            const data = res.data;
            try {
              axios.post(api + '/questions', { user: data, uuid: localStorage.getItem("mi"), trueAnswers: trueQuestions, falseAnswers: falseQuestions, unansweredQuestions: unansweredQuestions, trueCount: trueQuestions.length, falseCount: falseQuestions.length, unansweredCount: unansweredQuestions.length }).then(data => {
                console.log(data)
              })
            } catch(err) {
              console.log(err);
            }
          })
          localStorage.setItem('resultsPage', 1)
          redirect('../results')
        }
        setAnswers(shuffleAnswers(answersTypes))
        return prevQuestionId + 1
      })

      setButtonValue(null)
    }, 1000)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === maxSeconds) {
          setSeconds(0);
          setQuestionId(prevQuestionId => {
            const nextQuestionId = prevQuestionId !== tasks.length - 1 ? prevQuestionId + 1 : prevQuestionId;
            if (tasks[prevQuestionId].answers !== "matched" || tasks[prevQuestionId].answers !== "not_matched_1" || tasks[prevQuestionId].answers !== "not_matched_2") {
              setUnansweredQuestions([...unansweredQuestions, prevQuestionId])
              alert(unansweredQuestions)
              console.log(unansweredQuestions);
            }
            if (prevQuestionId === tasks.length - 1 && prevSeconds === maxSeconds) {
              axios.get('/students/get/' + localStorage.getItem("mi"))
                .then(async (res) => {
                  try {
                    const data = await axios.post(api + '/questions', {
                      user: res.data,
                      uuid: localStorage.getItem("mi"),
                      trueAnswers: trueQuestions,
                      falseAnswers: falseQuestions,
                      unansweredQuestions: unansweredQuestions,
                      trueCount: trueQuestions.length,
                      falseCount: falseQuestions.length,
                      unansweredCount: unansweredQuestions.length
                    });
                    console.log(data);
                    // redirect('../results');
                  } catch (error) {
                    console.error("Error in POST request:", error);
                  }
                })
                .catch(error => {
                  console.error("Error in GET request:", error);
                }); 
              setTrueAnswer(tasks[prevQuestionId].answers.matched);
              localStorage.setItem('resultsPage', 1);
            }
            if (nextQuestionId === tasks.length) {
              clearInterval(intervalId);
              return prevQuestionId;
            }

            return nextQuestionId;
          });
          return 10;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [maxSeconds, redirect, tasks.length, trueQuestions, falseQuestions, unansweredQuestions]);

  console.log(trueAnswer);

  const shuffleAnswers = (array) => {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }


  const isAuthenticated = localStorage.getItem("mi")
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/')
  }

  const answersTypes = ["matched", "not_matched_1", "not_matched_2"];

  const [answers, setAnswers] = useState(shuffleAnswers(answersTypes))

  return (
    questionId < tasks.length ? (
      <div className='p-[15px]'>
        <h1 className='text-[2rem] text-center mt-[40px] font-bold font-["Montserrat"]'>Quiz App</h1>
        <h3 className='text-center'><span className='text-secondary text-[2rem] font-bold'>{seconds}</span></h3>
        <div className="bg-secondary h-[5px] my-[10px] rounded-lg" style={{
          width: (seconds / maxSeconds) * 100 + "%",
          transition: "0.5s"
        }}></div>
        <h2 className='font-bold text-[1.17em] text-center'>{tasks[questionId].task}</h2>
        <div className="answers flex flex-col gap-[10px] mt-[40px]">
          {
            answers.map((item, i) => {
              return <Button key={i} onClick={() => answer(item)} className='h-[46px] text-white' isDisabled={seconds >= maxSeconds || buttonValue !== null ? true : false} color={seconds === maxSeconds || buttonValue !== null ? tasks[questionId].answers[item] === tasks[questionId].answers.matched ? "success" : "danger" : "secondary"}>{tasks[questionId].answers[item]}</Button>
            })
          }
        </div>
      </div>
    ) : <div></div>
  );
}

export default Play;