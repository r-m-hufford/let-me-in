import { test, whoami } from "../api/auth";

const Test = () => {
  const handleTest = async () => {
    const result = await whoami()
    console.log({ result });
  }

  return (
    <div>
      <button onClick={handleTest}>
        test
      </button>
    </div>
  )
}

export default Test;