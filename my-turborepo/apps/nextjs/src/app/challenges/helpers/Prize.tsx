interface prizeSchema {
  children: React.ReactNode;
}

export default function Prize({ children }: prizeSchema) {
  //TODO: Generate the prizes section of a challenge
  // Info may or may not include an image
  return (
    < div className = "justify-self-stretch text-xl font-extrabold" >
    { children }
    </div >  
  )
}
