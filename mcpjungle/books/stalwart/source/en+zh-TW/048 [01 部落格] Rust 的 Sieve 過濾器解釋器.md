---

## title: "Sieve filter interpreter for Rust｜Rust 的 Sieve 過濾器解釋器"

 title\_original: "Sieve filter interpreter for Rust"
source: "[https://stalw.art/blog/sieve-interpreter-rust](https://stalw.art/blog/sieve-interpreter-rust)"
chapter: \["blog"\]
order: 48
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:29.243Z"

 ⬆ 目錄　｜　⬅ 上一篇：Advanced Filtering with Sieve Expressions｜使用篩分錶達式進行進階過濾　｜　下一篇：Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器 ➡

# Sieve filter interpreter for Rust｜Rust 的 Sieve 過濾器解釋器

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Oct 21, 2022 - 1 min read

 2022年10月21日 - 閱讀時間：1分鐘

 \[![Mauro D.](assets/selected_357_image_001.png)

 Mauro D.

 毛羅·D.

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Today, the [sieve-rs crate](https://crates.io/crates/sieve-rs) was released which is an interpreter for Sieve scripts written in Rust. The interpreter includes support for [all existing Sieve extensions](https://www.iana.org/assignments/sieve-extensions/sieve-extensions.xhtml).

 今天，[sieve-rs crate](https://crates.io/crates/sieve-rs)發布了，它是一個用於解釋用 Rust 編寫的 Sieve 腳本的解釋器。此解釋器支援[所有現有的 Sieve 擴展](https://www.iana.org/assignments/sieve-extensions/sieve-extensions.xhtml) 。

 Currently the interpreter is available as a standalone library but it will be soon added to [Stalwart JMAP](https://github.com/stalwartlabs/jmap-server) \(including JMAP Sieve support\) and [Stalwart IMAP](https://github.com/stalwartlabs/imap-server) \(including ManageSieve support\).

 目前該解釋器可作為獨立庫使用，但很快就會添加到 [Stalwart JMAP](https://github.com/stalwartlabs/jmap-server) （包括JMAP Sieve 支持）和 [Stalwart IMAP](https://github.com/stalwartlabs/imap-server) （包括 ManageSieve 支持）中。

 Compiling and running a Sieve script is straightforward:

 編譯和運行 Sieve 腳本非常簡單：

```rust title=&amp;quot;Project Maintainer&amp;quot;
    use sieve::{runtime::RuntimeError, Action, Compiler, Event, Input, Runtime};

        let text_script = br#"
        require ["fileinto", "body", "imap4flags"];

        if body :contains "tps" {
            setflag "$tps_reports";
        }

        if header :matches "List-ID" "*<*@*" {
            fileinto "INBOX.lists.${2}"; stop;
        }
        "#;

        // Compile
        let compiler = Compiler::new();
        let script = compiler.compile(text_script).unwrap();

        // Build runtime
        let runtime = Runtime::new();

        // Create filter instance
        let mut instance = runtime.filter(
            br#"From: Sales Mailing List <[email protected]>
    To: John Doe <[email protected]>
    List-ID: <[email protected]>
    Subject: TPS Reports

    We're putting new coversheets on all the TPS reports before they go out now.
    So if you could go ahead and try to remember to do that from now on, that'd be great. All right!
    "#,
        );
        let mut input = Input::script("my-script", script);

        // Start event loop
        while let Some(result) = instance.run(input) {
            match result {
                Ok(event) => match event {
                    Event::IncludeScript { name, optional } => {
                        // NOTE: Just for demonstration purposes, script name needs to be validated first.
                        if let Ok(bytes) = std::fs::read(name.as_str()) {
                            let script = compiler.compile(&bytes).unwrap();
                            input = Input::script(name, script);
                        } else if optional {
                            input = Input::False;
                        } else {
                            panic!("Script {} not found.", name);
                        }
                    }
                    Event::MailboxExists { .. } => {
                        // Return true if the mailbox exists
                        input = false.into();
                    }
                    Event::ListContains { .. } => {
                        // Return true if the list(s) contains an entry
                        input = false.into();
                    }
                    Event::DuplicateId { .. } => {
                        // Return true if the ID is duplicate
                        input = false.into();
                    }
                    Event::Execute { command, arguments } => {
                        println!(
                            "Script executed command {:?} with parameters {:?}",
                            command, arguments
                        );
                        input = false.into(); // Report whether the script succeeded
                    }
                    #[cfg(test)]
_ => unreachable!(),
                },
                Err(error) => {
                    match error {
                        RuntimeError::IllegalAction => {
                            eprintln!("Script tried allocating more variables than allowed.");
                        }
                        RuntimeError::TooManyIncludes => {
                            eprintln!("Too many included scripts.");
                        }
                        RuntimeError::InvalidInstruction(instruction) => {
                            eprintln!(
                                "Invalid instruction {:?} found at {}:{}.",
                                instruction.name(),
                                instruction.line_num(),
                                instruction.line_pos()
                            );
                        }
                        RuntimeError::ScriptErrorMessage(message) => {
                            eprintln!("Script called the 'error' function with {:?}", message);
                        }
                        RuntimeError::CapabilityNotAllowed(capability) => {
                            eprintln!(
                                "Capability {:?} has been disabled by the administrator.",
                                capability
                            );
                        }
                        RuntimeError::CapabilityNotSupported(capability) => {
                            eprintln!("Capability {:?} not supported.", capability);
                        }
                        RuntimeError::OutOfMemory => {
                            eprintln!("Script exceeded the configured memory limit.");
                        }
                        RuntimeError::CPULimitReached => {
                            eprintln!("Script exceeded the configured CPU limit.");
                        }
                    }
                    break;
                }
            }
        }

        // Process actions
        for action in instance.get_actions() {
            match action {
                Action::Keep { flags, message_id } => {
                    println!(
                        "Keep message '{}' with flags {:?}.",
                        std::str::from_utf8(instance.get_message(*message_id).unwrap()).unwrap(),
                        flags
                    );
                }
                Action::Discard => {
                    println!("Discard message.")
                }
                Action::Reject { reason } => {
                    println!("Reject message with reason {:?}.", reason);
                }
                Action::Ereject { reason } => {
                    println!("Ereject message with reason {:?}.", reason);
                }
                Action::FileInto {
                    folder,
                    flags,
                    message_id,
                    ..
                } => {
                    println!(
                        "File message '{}' in folder {:?} with flags {:?}.",
                        std::str::from_utf8(instance.get_message(*message_id).unwrap()).unwrap(),
                        folder,
                        flags
                    );
                }
                Action::SendMessage {
                    recipient,
                    message_id,
                    ..
                } => {
                    println!(
                        "Send message '{}' to {:?}.",
                        std::str::from_utf8(instance.get_message(*message_id).unwrap()).unwrap(),
                        recipient
                    );
                }
                Action::Notify {
                    message, method, ..
                } => {
                    println!("Notify URI {:?} with message {:?}", method, message);
                }
            }
        }
```

Additional examples are available on the [repository](https://github.com/stalwartlabs/sieve).

 更多範例可在[儲存庫](https://github.com/stalwartlabs/sieve)上找到。

**Tags:**

**標籤：**

- [sieve](https://stalw.art/blog/tags/sieve/)
[篩子](https://stalw.art/blog/tags/sieve/)
- [interpreter](https://stalw.art/blog/tags/interpreter/)
[譯者](https://stalw.art/blog/tags/interpreter/)
- [rust](https://stalw.art/blog/tags/rust/)
[鏽跡](https://stalw.art/blog/tags/rust/)
Sieve filters are now available on Stalwart JMAP v0.2
 Stalwart JMAP v0.2現已推出篩網過濾器

 Announcing Stalwart JMAP server

 Stalwart JMAP伺服器上線

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Advanced Filtering with Sieve Expressions｜使用篩分錶達式進行進階過濾　｜　下一篇：Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器 ➡
