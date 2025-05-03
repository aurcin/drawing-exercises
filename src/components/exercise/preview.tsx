interface PreviewProps {
  image: string | null;
}

function Preview(props: PreviewProps) {
  const { image } = props;

  if (!image) {
    return <p>No image to draw</p>;
  }

  return (
    <>
      <img src={image} alt='image to draw' />
    </>
  );
}

export default Preview;
