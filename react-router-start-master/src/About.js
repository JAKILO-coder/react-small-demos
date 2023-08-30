import {useSearchParams} from 'react-router-dom'

function About () {
    const [params] = useSearchParams()
    const id = params.get('id')
    return (
        <div>about:得到的id为：{id}</div>
    )
}

export default About
