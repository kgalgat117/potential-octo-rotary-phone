import React, { useState } from 'react'
import { updateProblems } from './../utils/api'


function Problems() {

    const [data, setData] = useState({ problems: [], calculateScore: true, score: 0, flag: 'request' })

    async function setProblems() {
        try {
            let response = await updateProblems(data)
            if (response) {
                let temp = { ...data }
                temp.score = response.data.sleepScore
                temp.flag = 'response'
                setData(temp)
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }

    function valueChange(event) {
        let temp = { ...data }
        if (event.target.checked) {
            temp.problems.push(event.target.value)
        } else {
            temp.problems.splice(temp.problems.indexOf(event.target.value), 1)
        }
        setData(temp)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {data.flag === 'request' &&
                    <div className="col-md-12">
                        <h4>Let's say in a few weeks, you're sleeping well. What would change? </h4>
                        <form action="" className="aa-login-form">
                            <label for="">Select all the changes you would like to see <span></span></label>
                            <div class="form-check">
                                <input class="form-check-input" onChange={valueChange} type="checkbox" value="sleep_easily" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    I would go to sleep easily
                        </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" onChange={valueChange} type="checkbox" value="sleep_through_night" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    I would sleep through the night
                        </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" onChange={valueChange} type="checkbox" value="wake_on_time" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    I'd wake up on time, refreshed
                        </label>
                            </div>
                            <button type="button" onClick={setProblems} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                }
                {data.flag === 'response' &&
                    <div className="col-md-12">
                        <h4>Your Sleep Score is {data.score} </h4>
                    </div>
                }
            </div>
        </div>
    )
}

export { Problems }