j
import { MovieApi } from "./MovieApi"

export function Preview ({title, imgPath}) {
    return(
        <div className="preview-cotainer">
            <img className="preview-img" src={MovieApi.getImage(imgPath)} alt={title}></img>
            <div className="preview-title">{title}</div>
        </div>
    )
}
