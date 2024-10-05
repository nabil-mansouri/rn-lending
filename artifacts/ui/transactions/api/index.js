//import { TransactionServiceMock as TransactionService } from "./mock_service";
import { TransactionService } from "./transaction";
import { coService } from "../../contacts/api";
import { PhotoService } from "./photos";
export { coService };
export const trService = new TransactionService();
export const phoService = new PhotoService();
//# sourceMappingURL=index.js.map