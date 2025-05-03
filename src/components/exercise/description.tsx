interface ExerciseDescriptionProps {
  description: string;
  examples: string[];
}

function ExerciseDescription(props: ExerciseDescriptionProps) {
  const { description, examples } = props;

  return (
    <>
      <h2 className='text-xl'>Description</h2>
      <p className='mt-2 text-foreground/80'>{description}</p>
      {examples.length > 0 && (
        <div className='mt-4'>
          {examples.map(example => (
            <img key={example} src={example} alt='hm' />
          ))}
        </div>
      )}
    </>
  );
}

export default ExerciseDescription;
