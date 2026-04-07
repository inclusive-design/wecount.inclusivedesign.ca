import { v4 as uuidv4 } from "uuid";

export default value => {
	return value.concat("-" + uuidv4());
};
