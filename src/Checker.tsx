import Loader from './Loading/Loading';
import Result from './Result/Result';
interface Props {
    data: any,
    scale: string,
    image: string | undefined
}
export const CheckScale: React.FC<Props> = ({data, scale, image}): any => {
    if (scale === "loading") {
      return (
        <Loader />
      )
    } else if (scale === "finished") {
      return (
        <Result data={data} image={image} />
      )
    }
  }