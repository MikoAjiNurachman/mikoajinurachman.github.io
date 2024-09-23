
type CardImage = {
  image: string,
  desc: string,
  imgLink?: string,  
}

export default function CardImage({image, desc, imgLink = ''}: CardImage) {
  return (
    <a href={imgLink} target="_blank">
      <img
        className="w-full h-64 object-cover rounded-xl shadow-md"
        src={image}
        alt={desc}
      />
      <span>{desc}</span>
    </a>
  )
}
